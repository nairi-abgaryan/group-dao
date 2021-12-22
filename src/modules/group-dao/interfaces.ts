export interface CreateAnnouncementPayload {
  markdown?: string | null
  attachment_images?: string[]
  attachment_link_preview?: AttachmentLinkPreviewPayload
}

export interface AttachmentLinkPreviewPayload {
  url: string
}

export interface GroupParams {
  group_uuid: string
}
