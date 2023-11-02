interface Props {
  content: string;
  maxLength: number;
}

function PostPreview({ content, maxLength }: Props) {
  if (content.length <= maxLength) {
    return <>{content}</>;
  }

  const truncatedBody = content.slice(0, maxLength) + "...";
  return <>{truncatedBody}</>;
}

export default PostPreview;
