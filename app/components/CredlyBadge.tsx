interface CredlyBadgeProps {
  badgeId: string
}

export default function CredlyBadge({ badgeId }: CredlyBadgeProps) {
  return (
    <div 
      data-iframe-width="180"
      data-iframe-height="270"
      data-share-badge-id={badgeId}
      data-share-badge-host="https://www.credly.com"
    />
  )
}