import { Request, Response } from "express";
import httpStatus from "http-status-codes";

import { authService, tokenService, userService } from "../services";
import catchAsync from "../../utils/catch-async";

// const login = catchAsync(async (req: Request, res: Response) => {
//     const { email, password } = req.body;
//     const user = await authService.loginWithEmail(email, password);
//     const token = await tokenService.generateJwtToken(user);
//     res.setHeader("Authorization", token);
//     res.status(httpStatus.OK).send({ user, token });
// });

// const register = catchAsync(async (req: Request, res: Response) => {
//     const user = await userService.createUser(req.body);
//     const token = await tokenService.generateJwtToken(user);
//     res.setHeader("Authorization", `Bearer ${token}`);
//     res.status(httpStatus.CREATED).send({ user });
// });

// const changePassword = catchAsync(async (req: Request, res: Response) => {
//     const { passwordPre, passwordNew } = req.body;
//     await authService.changePassword(req.jwtPayload, passwordPre, passwordNew);
//     res.status(httpStatus.OK).send({ message: "Change password successfully" });
// });

// export { login, register, changePassword };
