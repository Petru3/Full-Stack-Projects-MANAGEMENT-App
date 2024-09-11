import { IsIn, IsNotEmpty, IsOptional } from "class-validator";
import { ProjectStatus } from "../project-status.enum";

export class GetProjectsFilterDto {
    
    @IsOptional()
    @IsNotEmpty()
    @IsIn(
        [
            ProjectStatus.DONE,
            ProjectStatus.IN_PROGRESS
        ]
    )
    status: ProjectStatus

    @IsOptional()
    @IsNotEmpty()
    search: string;
}