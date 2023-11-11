import { Controller, Get } from '@nestjs/common';
import type { WorkspaceService } from './workspace.service';

@Controller('workspace')
export class WorkspaceController {
  constructor(private readonly workspaceService: WorkspaceService) {}

  @Get()
  getHello(): string {
    return 'Hello World from workspace!';
  }
}
