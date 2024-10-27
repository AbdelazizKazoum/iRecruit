/* eslint-disable prettier/prettier */
import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { User } from 'src/schemas/user.schema';
import { RegisterUserDto } from './dto/register-user.dto';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth-guard';
import { JwtService } from '@nestjs/jwt';
import { UserUtilsService } from 'src/common/services/user-utils.service';
import { UpdatePasswordDto } from './dto/update-password.dto';
@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModal: Model<User>,
    private jwtService: JwtService,
    private userUtilsService: UserUtilsService,
  ) {}

  @UseGuards(JwtAuthGuard)
  async create(createUserDto: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const newUser = new this.userModal({
      ...createUserDto,
      password: hashedPassword,
    });
    return newUser.save();
  }

  async registerUser(registerUserDto: RegisterUserDto) {
    // Verify the verification code
    const payload = this.verifyVerificationCode(registerUserDto.code);

    // Check if a user with the email already exists
    const user = await this.findOneByEmail(payload.email);
    if (user) throw new ConflictException("L'utilisateur existe déjà");

    try {
      // Hash the password
      const hashedPassword = await bcrypt.hash(registerUserDto.password, 10);

      // Create a new user
      const newUser = new this.userModal({
        username: payload.username,
        email: payload.email,
        password: hashedPassword,
        role: 'Candidat',
      });

      // Save the user in the database
      const savedUser = await newUser.save();

      // Exclude the password before returning the user
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...userWithoutPassword } = savedUser.toObject();

      // Return the user object without the password
      return userWithoutPassword;
    } catch (error) {
      throw new InternalServerErrorException(
        'Error registering the user',
        error,
      );
    }
  }

  async updatePassword(updatePasswordDto: UpdatePasswordDto) {
    // Find the user by email
    const user = await this.findOneByEmail(updatePasswordDto.email);
    if (!user) throw new NotFoundException("L'utilisateur n'existe pas");

    try {
      // Hash the new password
      const hashedNewPassword = await bcrypt.hash(
        updatePasswordDto.newPassword,
        10,
      );

      // Update the user's password
      const updatedUser = await this.userModal.findByIdAndUpdate(
        updatePasswordDto.id,
        { password: hashedNewPassword },
        { new: true }, // Return the updated document
      );

      // Exclude the password before returning the user
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...userWithoutPassword } = updatedUser.toObject();

      // Return the user object without the password
      return userWithoutPassword;
    } catch (error) {
      throw new InternalServerErrorException(
        'Erreur lors de la mise à jour du mot de passe',
        error,
      );
    }
  }

  findAll() {
    return this.userModal.find().exec();
  }

  async findOneByEmail(email: string): Promise<User> {
    try {
      return await this.userModal.findOne({ email }).exec();
    } catch (error) {
      throw new UnauthorizedException(error);
    }
  }
  async findOneById(id: string) {
    try {
      return await this.userModal.findById(id).select('-password').exec();
    } catch (error) {
      throw new UnauthorizedException(error);
    }
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: string) {
    return this.userModal.deleteOne({ _id: id });
  }

  // ------------------------- Methods -----------------
  private verifyVerificationCode(code: string): any {
    try {
      const payload = this.jwtService.verify(code);

      console.log('🚀 ~ UsersService ~ verifyVerificationCode ~ code:', code);
      return payload;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      throw new UnauthorizedException('Verification code is invalid!');
    }
  }
}
