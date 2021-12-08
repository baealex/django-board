import styles from './SpeechBubble.module.scss';
import classNames from 'classnames/bind';
const cn = classNames.bind(styles);

import Link from 'next/link';

interface SpeechBubbleProps {
    username: string;
    userImage: string;
    children?: string;
};

import {
    getUserImage,
} from '@modules/image';

export function SpeechBubble(props: SpeechBubbleProps) {
    return (
        <>
            <div className={classNames(cn('bubble'), 'mb-3')}>
                <blockquote>
                    {props.children && props.children}
                </blockquote>
                <div className={cn('user')}>
                    <Link href="/[author]" as={`/@${props.username}`}>
                        <a>
                            <img
                                alt={props.username}
                                src={getUserImage(props.userImage)}
                            />
                        </a>
                    </Link>
                </div>
            </div>
        </>
    )
}