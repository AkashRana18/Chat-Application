import TimeAgo from 'timeago-react';
import { Button } from 'rsuite';
import ProfileAvatar from '../../dashboard/ProfileAvatar';
import ProfileInfoBtnModal from './ProfileInfoBtnModal';
import PresenceDot from '../../PresenceDot';
import { useCurrentRoom } from '../../../context/current-room.context';
import { memo } from 'react';
import { auth } from '../../../misc/firebase';

const MessageItem = ({ messages, handleAdmin }) => {
  const { author, createdAt, text } = messages;

  const isAdmin = useCurrentRoom(v => v.isAdmin);
  const admins = useCurrentRoom(v => v.admins);

  const isMsgAuthorAdmin = admins.includes(author.uid);
  const isAuthor = auth.currentUser.uid === author.uid;
  const canGrantAdmin = isAdmin && !isAuthor;

  return (
    <li className="padded mb-1">
      <div className="d-flex align-items-center font-bolder mb-1">
        <PresenceDot uid={author.uid} />
        <ProfileAvatar
          name={author.name}
          src={author.avatar}
          className="ml-1"
          size="xs"
        />

        <ProfileInfoBtnModal
          profile={author}
          appearance="link"
          className="p-0 ml-1 text-black"
        >
          {canGrantAdmin && (
            <Button block onClick={() => handleAdmin(author.uid) } color="blue">
              {isMsgAuthorAdmin
                ? 'Remove admin permission'
                : 'Give admin in this room '}
            </Button>
          )}
        </ProfileInfoBtnModal>

        <TimeAgo
          className="font-normal text-black-45 ml-2"
          datetime={createdAt}
        />
      </div>
      <div>
        <span className="word-break-all">{text} </span>
      </div>
    </li>
  );
};

export default memo(MessageItem);
