import styles from './Layout.module.scss';
import classNames from 'classnames/bind';
const cn = classNames.bind(styles);

import {
    Footer,
    Social,
    SocialProps,
} from '@system-design/shared';
import {
    ProfileNavigation
} from '@system-design/profile';

export interface ProfileLayoutProps {
    profile: {
        image: string;
        realname: string;
        username: string;
        bio: string;
    },
    social: SocialProps;
    active: string;
    children?: JSX.Element;
};

export function ProfileLayout(props: ProfileLayoutProps) {
    return (
        <>
            <div className="col-md-12">
                <div className={`${cn('user')} gothic`}>
                    <img className={cn('avatar')} src={props.profile.image}/>
                    <div className={cn('realname')}>{props.profile.realname}</div>
                    <div className={cn('username')}>@{props.profile.username}</div>
                    <Social {...props.social}/>
                </div>
            </div>
            <ProfileNavigation
                active={props.active}
                username={props.profile.username}
            />
            {props.children}
            <Footer/>
        </>
    )
}