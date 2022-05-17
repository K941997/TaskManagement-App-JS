/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  Post,
  Req,
  UseGuards,
  ValidationPipe,
  Session,
  Get,
  Param,
  HttpCode,
  Res,
  Request,
  UsePipes,
  Put,
  ParseIntPipe,
  Delete,
  Patch
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/authCredentials.dto';
import { AuthGuard } from '@nestjs/passport';
import { RequestWithUser } from './requestWithUser.interface';
import { request, Response } from 'express';
import { LocalAuthGuard } from './utils/guard/localAuthGuard.guard';
import * as bcrypt from 'bcrypt';
// import { AuthenticatedGuard } from './utils/guard/authGuard.guard';
import { JwtAuthGuard } from './utils/guard/jwtAuthGuard.guard';
import { AppAbility, CaslAbilityFactory } from 'src/casl/casl-ability.factory';
import { PoliciesGuard } from 'src/casl/policiesGuard.guard';
import { CheckPolicies } from 'src/casl/casl-ability.decorator';
import { Action } from 'src/casl/casl-action.enum';
import { UserEntity } from './entity/user.entity';
import { UpdateUserDto } from './dto/updateUser.dto';

@Controller('auth') //localhost:3000/api/auth
export class AuthController {
  constructor(
    private readonly authService: AuthService, //!private: vừa khai báo vừa injected vừa khởi tạo
    private caslAbilityFactory: CaslAbilityFactory) {}

  //!Sign Up:
  @Post('/signup')
  @UsePipes(ValidationPipe) //có hoặc không vì đã có Global Validation
  signUp(@Body() authCreadentialsDto: AuthCredentialsDto) {
    return this.authService.signUp(authCreadentialsDto);
  }


  //!SignIn:
  @HttpCode(200)
  @UseGuards(LocalAuthGuard) //!LocalStrategy Xác thực người dùng
  @Post('/signin')
  async signIn(@Request() req){ //!req lấy thông tin từ LocalAuthGuard
    const user = req.user;
    user.password = undefined;

    console.log(req.headers, "Đây là Headers")
    console.log(user, "Đây là User")
    // user.tasks = undefined; //Dùng user.entity eager: false
    // return {msg: ' Logged In ', user }; //Remove SessionCookie to use Guard JWTToken return access_token = BearerToken check SessionCookie:
    

    // const cookie = this.authService.loginPayloadJWTToken(user.id);
    // console.log(cookie);
    // const a = res.setHeader ('Set-Cookie', await cookie);
    // console.log(a)

    return this.authService.loginPayloadJWTToken(user)
   
  }

  // //!Protected (Session Cookie Không cần nhập tài khoản):
  // @UseGuards(AuthenticatedGuard) //!Remove SessionCookie to use Guard JWTToken return access_token = BearerToken check SessionCookie:
  // @Get('/protected')
  // getHello(@Request() req): string{
   
  //   return req.user; //!return with jwtStrategy
  // }

  //!Get Self Info After Guard SignIn:
  @Get('/profile')
  @UseGuards(JwtAuthGuard)
  getSelfInfo(@Req() request) { //!request lấy thông tin từ JWTToken
    const user = request.user;
    console.log(user);
    user.password = undefined;
    return user; //không có logic ở service nên return user luôn
  }

  //!Get All Users:
  @Get()
  findAllUsers() {
    return this.authService.findAllUsers();
  }

  

  //!Get User By Id: (Cần dùng):
  //!(Đã xong) Vì trùng /:username: (Thay = /username/:username)
  @Get('/:id')
  getUserInfoById(@Param('id', ParseIntPipe) id: number) {
    return this.authService.findUserById(id);
  }

  //!Get User By Username: (Không cần dùng):
  //!(Đã xong) Vì trùng /:id: (Thay = /username/:username)
  @Get('/username/:username')
  getUserInfoByUsername(@Param('username') username: string) {
    return this.authService.findUserByUsername(username);
  }

  //!Update User Advanced CASL Role:
  @Patch('/:id') //dùng Patch thay cho Put
  @UseGuards(JwtAuthGuard)
  @UsePipes(ValidationPipe)
  async updateTask(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
    @Req() req: RequestWithUser, //!(Req after LogIn) use in CASL
  ): Promise<UserEntity> {
    //todo: CASL to Role + isCreator:
    //todo: CASL to Service:
    const user = req.user
    //!(Đã xong) Lỗi update xong bị sai tài khoản vì chưa bcrypt:
    return this.authService.updateUser(id, updateUserDto, user);
  }

  //!Delete User Advanced CASL Role isAdmin isCreator:
  //!(Đã xong) nếu xóa 1 User phải xóa cả các relation:
  @Delete('/:id')
  //todo: CASL cho vào Service:
  @UseGuards(JwtAuthGuard) //!JwtAuthGuard
  async deleteUser(
    @Param('id', ParseIntPipe) id: number,
    @Req() req: RequestWithUser, //!(Req after LogIn) use in CASL
  ): Promise<void> {
    const user = req.user

    return this.authService.deleteUser(id, user);
  }
  

  // //!Log Out: (Không cần làm vì là của Frontend)
  // @UseGuards(JwtAuthGuard)
  // @Post('signout')
  // async logOut(@Req() request: RequestWithUser, @Res() response: Response) {
  //   response.setHeader('Set-Cookie', this.authService.getCookieForLogOut());
  //   return response.sendStatus(200);
  // }
}
