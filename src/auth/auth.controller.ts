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
  Delete
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/authCredentials.dto';
import { AuthGuard } from '@nestjs/passport';
import { RequestWithUser } from './requestWithUser.interface';
import { request, Response } from 'express';
import { LocalAuthGuard } from './utils/guard/localAuthGuard.guard';
import * as bcrypt from 'bcrypt';
import { AuthenticatedGuard } from './utils/guard/authGuard.guard';
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
  @UsePipes(ValidationPipe)
  signUp(@Body() authCreadentialsDto: AuthCredentialsDto) {
    console.log(authCreadentialsDto);
    return this.authService.signUp(authCreadentialsDto);
  }


  //!SignIn:
  @HttpCode(200)
  @UseGuards(LocalAuthGuard) //!LocalStrategy Xác thực người dùng
  @Post('/signin')
  async signIn(@Request() req){

    // console.log(req)
    const user = req.user;
    user.password = undefined;
    // user.tasks = undefined; //Dùng user.entity eager: false

    // return {msg: ' Logged In ', user }; //Remove SessionCookie to use Guard JWTToken return access_token = BearerToken check SessionCookie:
    const token = this.authService.loginPayloadJWTToken(user)
    return token;
  }

  // //!Protected (Session Cookie Không cần nhập tài khoản):
  // // @UseGuards(AuthenticatedGuard) //!Remove SessionCookie to use Guard JWTToken return access_token = BearerToken check SessionCookie:
  // @UseGuards(JwtAuthGuard)  //Todo: JWTAuthGuard Bearer Token (for Protected after Login):
  // @Get('/protected')
  // getHello(@Request() req): string{
   
  //   return req.user; //!return with jwtStrategy
  // }

  // //!Get Self Info After Guard SignIn:
  // @UseGuards(AuthGuard())
  // @Get('/self')
  // getSelfInfo(@Req() request: RequestWithUser) {
  //   const user = request.user;
  //   console.log(user);
  //   user.password = undefined;
  //   return user;
  // }

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
    return this.authService.findOneUser(username);
  }

  //!Update User Advanced CASL Role:
  @Put('/:id')
  @UseGuards(JwtAuthGuard, PoliciesGuard)
  @CheckPolicies((ability: AppAbility) => ability.can(Action.Update, UserEntity))
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
  //todo: CASL Advanced:
  //todo: CASL cho vào Service:
  @UseGuards(JwtAuthGuard, PoliciesGuard) //!JwtAuthGuard + CASL
  @CheckPolicies((ability: AppAbility) => ability.can(Action.Delete, UserEntity))
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
