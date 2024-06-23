import { iTask } from "./task.model";

export interface iProject {
    id?: string,
    nombre?: string,
    descripcion?: string,
    estado?: string,
    tasks?: iTask[]
}