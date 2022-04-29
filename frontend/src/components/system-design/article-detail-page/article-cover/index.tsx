import classNames from 'classnames/bind';
import styles from './ArticleCover.module.scss';
const cn = classNames.bind(styles);

export function ArticleCover(props: {
    series?: string;
    image: string;
    title: string;
    isAd: boolean;
    createdDate: string;
    updatedDate: string;
}) {
    return (
        <div className={cn('full-cover')}>
            <div className={cn('image-cover')}>
                <div style={props.image ? {
                    backgroundImage: 'url(https://static.blex.me/' + props.image + ')'
                } : undefined}></div>
            </div>
            <div className={cn('inner')}>
                <div className={cn('container')}>
                    {props.series && (
                        <span>‘{props.series}’ 시리즈</span>
                    )}
                    <h1>{props.title}</h1>
                    <time className="post-date">
                        {props.createdDate}
                        {props.createdDate !== props.updatedDate && ` (Updated: ${props.updatedDate})`}
                    </time>
                </div>
            </div>
            {props.isAd && (
                <div className={cn('ad')}>
                    유료 광고 포함
                </div>
            )}
        </div>
    );
}