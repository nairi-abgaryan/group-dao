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
  proposal_type: string
  url: string
  dao_id: string
  option_1: string
  option_2: string
  title: string
  closed_at: string
}

export interface GroupParam {
  group_uuid: string
}
