import express, { Application, Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import routes from "./src/routes/index";
import { connect } from "./src/configs/index"

//Environment
dotenv.config();

//Connect Database
connect();

//App
const app: Application = express();

//Middleware
app.use(morgan("dev"))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//Routes
routes(app);

//Error
//Catch 404
app.use((req: Request, res: Response, next: NextFunction) => {
    const err = new Error("Not found");
    next(err);
})

//Error handler function
app.use((err:Error, req: Request, res: Response, next: NextFunction) => {
    //Incomplete
    const error = app.get('env') === "development" ? err : {message: "Error not found"};
    const status = 500;
    //Response to client
    return res.status(status).json({
        error: {
            message: error.message,
            status: status,
        }
    })
})

//Start the server
const port = app.get('port') || process.env.PORT_SERVER;
app.listen(port, () => console.log(`Server is listening on port: ${port}`));