import { Avatar } from 'rsuite';
import { getNameInitials } from '../../misc/helpers';

const ProfileAvatar = ({ name, ...avatarProps }) => {
  return (
    <Avatar circle {...avatarProps}>
      {name && getNameInitials(name)}
    </Avatar>
  );
};

export default ProfileAvatar;
