import { dataSource } from "../../config";
import { Jwt } from "../../config/jwt";
import { CustomError } from "../../error/custom-error";
import { User } from "../users";
import UserService from "../users/user-service";
import { AuthRequest } from "./dto";

class AuthService {
  public authRepository = dataSource.getRepository(User);

  constructor(private readonly userService: UserService) {}

  async login(authInputDto: AuthRequest): Promise<string | null> {
    const { email, password } = authInputDto;
    const exists = await this.userService.findByEmail(email);
    if (!exists) throw CustomError.badRequest("Email invalid");
    const correct = await exists!.checkPassword(password);
    if (!correct) throw CustomError.badRequest("Password invalid");
    return await Jwt.generateToken({ id: exists.id, name: exists.name }, "1h");
  }
}

export default AuthService;
