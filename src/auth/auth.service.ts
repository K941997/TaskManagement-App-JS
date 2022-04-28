/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from './dto/authCredentials.dto';
// import { JwtPayload } from './utils/payload/jwtPayload.interface';
import { UserEntity } from './entity/user.entity';
import { UserRepository } from './user.repository';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { from, map, Observable } from 'rxjs';
import { UpdateUserDto } from './dto/updateUser.dto';
import { CaslAbilityFactory } from 'src/casl/casl-ability.factory';
import { ForbiddenError } from '@casl/ability';
import { Action } from 'src/casl/casl-action.enum';

@Injectable() //!@Injectable: injected Service to Controller
export class AuthService {
  constructor(
    @InjectRepository(UserRepository) //!@InjectRepository: đưa UserRepository vào Service
    private userRepository: UserRepository, //!private: vừa khai báo vừa injected vừa khởi tạo

    private jwtService: JwtService,
    private readonly configService: ConfigService,
    private caslAbilityFactory: CaslAbilityFactory
  ) {}

  //!Sign Up:
  async create(userData: AuthCredentialsDto) {
    const newUser = await this.userRepository.create(userData);
    await this.userRepository.save(newUser);
    return newUser;
  }

  async signUp(authCredentialsDto: AuthCredentialsDto) { //!Vì chỉ lấy DTO username password nên UserEntity phải nullable:true
    const hashedPassword = await bcrypt.hash(authCredentialsDto.password, 10); //10 = bcrypt.genSalt(10)
    try{
      const createdUser = await this.create({
        ...authCredentialsDto,
        password: hashedPassword
      });
      return createdUser;
       
    } catch(err) {
      if (err?.code === '23505') {
        throw new HttpException('User with that Username already exists', HttpStatus.BAD_REQUEST);
      }
      throw new HttpException('Something went wrong', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
 
  //!Sign In:

  //!Verify Password: LocalStrategy Xác thực người dùng: 
  //Todo: for ValidateUser:
  private async verifyPassword(plainTextPassword: string, hashedPassword: string) {
    const isPasswordMatching = await bcrypt.compare(
      plainTextPassword,
      hashedPassword
    );
    if (!isPasswordMatching) {
      throw new HttpException('Sai mật khẩu', HttpStatus.BAD_REQUEST);
    }
  }

  //!ValidateUser: LocalStrategy Xác thực người dùng: 
  //Todo: for LocalStrategy for LocalGuard (for Login): 
  public async validateUser(username: string, plainTextPassword: string) {
    try {
      const user = await this.findOneUser(username);

      await this.verifyPassword(plainTextPassword, user.password);
      return user;
    } catch (error) {
      console.log(username, plainTextPassword, 'Lỗi');

      throw new HttpException('Sai tài khoản', HttpStatus.BAD_REQUEST);
    }
  }

  //!LoginPayloadJWTToken: Đăng nhập tạo Token:
  //Todo: for AuthController Login:
  //!Remove SessionCookie to Use Guard JWTToken return access_token = BearerToken check SessionCookie:
  async loginPayloadJWTToken (user: any) {
    //Todo: JWTStrategy Bearer Token (for Protected after Login):
    const payload = {sub: user.id, role: user.role, isAdmin: user.isAdmin} //!send payload to jwtStrategy
    // console.log(payload)

    return {
      ...user,
      access_token: this.jwtService.sign(payload)
    }
  }
  
  
  
  //!Get All Users:
  async findAllUsers(): Promise<UserEntity[]> {
    const query = this.userRepository.createQueryBuilder('user')
      .orderBy("user.id");

    const allUsers =  await query.getMany();
    for (const oneUser of allUsers) {
      oneUser.password = undefined;   
    }

    return allUsers;
  }

  //!Get One User: (Không cần dùng)
  //!(Đã xong) Vì trùng /:id:
  async findOneUser(username: string): Promise<UserEntity> {
    const user = await this.userRepository.findOne({ where: { username: username }  })
    console.log(user);
    
    if (user) {
      return user;
    } else {
      throw new HttpException('User with this username does not exist', HttpStatus.NOT_FOUND);
    }

    // const user1 = await this.userRepository.createQueryBuilder("user")
    //   .where("user.username = :username")
    //   .getOne()
    // return user1;

    // const user = await this.userRepository.createQueryBuilder('user')
    //   .select('user.id', 'user.username', { role: 'roles.name' })
    //   .innerJoin('roles', 'roles.id', 'users.roleId')
    //   .where('email', email)
    //   .first();

  // return user;
  }

  //!Get User By Id: (Cần dùng):
  //!(Đã xong) Vì trùng /:username:
  async findUserById(id: number): Promise<UserEntity> {
    const userFound = await this.userRepository.findOne(id, {relations: ['tasks']});

    if (!userFound) { //Error Handle:
      throw new NotFoundException(`User with ID ${id} not found !`);
    } else {
      return userFound;
    }
  }

  //!Update User: (CASL Role isAdmin isCreator):
  async updateUser (id: number, updateUserDto: UpdateUserDto, user: UserEntity): Promise<UserEntity> {
    const caslAbility = this.caslAbilityFactory.createForUser(user)

    const userToUpdate = await this.findUserById(id);

    ForbiddenError.from(caslAbility)
      .setMessage('only admin or creator!')
      .throwUnlessCan(Action.Update, userToUpdate);
  
    const { name, password } = updateUserDto;

    userToUpdate.name = name;
    // userToUpdate.address = address;
    //!(Đã xong) Lỗi update xong bị sai tài khoản vì chưa bcrypt:
    userToUpdate.password = await bcrypt.hash(password, 10);

    await userToUpdate.save();
    return userToUpdate;
  }

  //!Delete User use CASL Role:
  //!(Đã xong) nếu xóa 1 User phải xóa cả các relation:
  async deleteUser(id: number, user: UserEntity): Promise<void> {
    const caslAbility = this.caslAbilityFactory.createForUser(user)

    //todo: CASL isAdmin isCreator:
    const userToDelete = await this.userRepository.findOne(id, {relations: ['tasks']});
    ForbiddenError.from(caslAbility)
      .setMessage('only admin or creator!')
      .throwUnlessCan(Action.Delete, userToDelete);

    const result = await this.userRepository.delete(id);
    if (result.affected === 0) { //Error Handle:
      throw new NotFoundException(`User with ID ${id} is not found !`);
    }

  }

  
  // //!LogOut: (Không cần vì Frontend làm Logout)
  // public getCookieForLogOut() {
  //   return `Authentication=; HttpOnly; Path=/; Max-Age=0`;
  // }
}
