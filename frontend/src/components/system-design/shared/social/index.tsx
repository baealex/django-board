import styles from './Social.module.scss';
import classNames from 'classnames/bind';
const cn = classNames.bind(styles);

export interface SocialProps {
    username: string;
    github?: string;
    twitter?: string;
    youtube?: string;
    facebook?: string;
    instagram?: string;
};

export function Social(props: SocialProps) {
    return (
        <ul className={cn('social')}>
            <li>
                <a href={`/rss/@${props.username}`}>
                    <i className="fas fa-rss-square"/>
                </a>
            </li>
            {['github', 'twitter', 'youtube', 'facebook', 'instagram'].map((name, idx) => (
                <>
                    {props[name as keyof SocialProps] && (
                        <li key={idx}>
                            <a href={(
                                name === 'youtube'
                                    ? `https://youtube.com/channel/${props.youtube}`
                                    : `https://${name}.com/${props[name as keyof SocialProps]}`
                            )}>
                                <i className={`fab fa-${name}-square`}/>
                            </a>
                        </li>
                    )}
                </>    
            ))}
        </ul>
    )
}