import { ProposalType } from './dto/create-group-dao.dto'

export interface CreateAnnouncementPayload {
  markdown?: string | null
  attachment_images?: string[]
  attachment_link_preview?: AttachmentLinkPreviewPayload
}

export interface AttachmentLinkPreviewPayload {
  url: string
}

export interface ProposalResponse {
  group_uuid: string
  id: string
  proposal_type: ProposalType
  url: string
}
