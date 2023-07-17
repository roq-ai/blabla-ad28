import { OrganizationInterface } from 'interfaces/organization';
import { GetQueryInterface } from 'interfaces';

export interface AudioFileInterface {
  id?: string;
  file_path: string;
  duration: number;
  organization_id?: string;
  created_at?: any;
  updated_at?: any;

  organization?: OrganizationInterface;
  _count?: {};
}

export interface AudioFileGetQueryInterface extends GetQueryInterface {
  id?: string;
  file_path?: string;
  organization_id?: string;
}
