import { FindManyOptions } from "typeorm";

import { dataSource } from "../../config";
import { User } from "./user-entity";
import { CustomError } from "../../error/custom-error";
import { plainToInstance } from "class-transformer";
import { CreateUserRequest, FindOneUserRequest, PaginationOptionsRequest, UpdateUserRequest } from "./dto/request";
import { UserResponse } from "./dto/response/user-response";


interface CustomResponse {
  users: UserResponse[];
  pagination: {
    current_page: number;
    total: number;
    page_size: number;
  };
}

class UserService {
  public userRepository = dataSource.getRepository(User);

  async create(
    createUserInput: CreateUserRequest
  ): Promise<UserResponse> {
    const { email } = createUserInput;
    const exists = await this.findByEmail(email);

    if (exists) {
      throw CustomError.badRequest(
        `The user already exists with email: ${email}`
      );
    }
    const created = await this.userRepository.create(createUserInput);

    const saved = await this.userRepository.save(created);
    return plainToInstance(UserResponse, saved, {
      excludeExtraneousValues: true,
    });
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.userRepository.findOne({
      where: {
        email,
      },
    });
    return user || null;
  }

  async getAll(
    PaginationOptionsDto: PaginationOptionsRequest
  ): Promise<CustomResponse> {
    const { page = 1, rowsPerPage = 5 } = PaginationOptionsDto;

    let findOptions: FindManyOptions<User> = {
      order: {
        id: "DESC",
      },
      skip: Math.max(0, (page - 1) * rowsPerPage),
      take: rowsPerPage,
    };

    const [users, totalUsers] = await this.userRepository.findAndCount(
      findOptions
    );
    return {
      users: users.map((user) =>
        plainToInstance(UserResponse, user, {
          excludeExtraneousValues: true,
        })
      ),
      pagination: {
        current_page: page,
        total: totalUsers,
        page_size: rowsPerPage,
      },
    };
  }

  async findOne(findOneUserDto: FindOneUserRequest): Promise<User> {
    const { id } = findOneUserDto;
    const user = await this.userRepository.findOne({
      where: {
        id,
      },
    });

    if (!user)
      throw CustomError.badRequest(`User does not exist with id: ${id}`);

    return user;
  }

  async update(
    findOneUserDto: FindOneUserRequest,
    updateUserDto: UpdateUserRequest
  ): Promise<UserResponse> {
    const user = await this.findOne(findOneUserDto);
    const userEmail = await this.findByEmail(updateUserDto.email);

    if (userEmail && userEmail.id !== user.id) {
      throw CustomError.badRequest(`Try another Email`);
    }

    const merged = this.userRepository.merge(user, updateUserDto);

    const saved = await this.userRepository.save(merged);
    return plainToInstance(UserResponse, saved, {
      excludeExtraneousValues: true,
    });
  }

  async delete(findOneUserDto: FindOneUserRequest): Promise<UserResponse> {
    const user = await this.findOne(findOneUserDto);
    const deleted = await this.userRepository.remove(user);
    return plainToInstance(UserResponse, deleted, {
      excludeExtraneousValues: true,
    });
  }
}

export default UserService;
