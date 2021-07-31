import styles from './ArticleCard.module.scss';
import classNames from 'classnames';

import Link from 'next/link';

import { Card } from '@components/atoms';
import {
    getPostsImage,
    getUserImage,
} from '@modules/image';

export interface ArticleCardProps {
    author?: string;
    url: string;
    image: string;
    title: string;
    description?: string;
    authorImage?: string;
    createdDate?: string;
    readTime?: number;
    className?: string;
}

export function ArticleCard(props: ArticleCardProps) {
    const url = props.author ? `/@${props.author}/${props.url}` : props.url;

    return (
        <div className={props.className}>
            <Card isRounded>
                <div className={classNames(
                    styles.posts
                )}>
                    <Link href={url}>
                        <a> 
                            <img
                                className={classNames(
                                    styles.postsImage,
                                    'lazy'
                                )}
                                src={getPostsImage(props.image) + '.preview.jpg'}
                                data-src={getPostsImage(props.image)}
                            />
                        </a>
                    </Link>
                </div>
                <div className="p-2">
                    <Link href={url}>
                        <a className="deep-dark">
                            <div className={`${styles.postsTitle} mt-3`}>
                                {props.title}
                            </div>
                            <p>{props.description}</p>
                        </a>
                    </Link>
                    {props.author && (
                        <div className="d-flex">
                            <Link href="/[author]" as={`/@${props.author}`}>
                                <a>
                                    <img
                                        className="fit-cover rounded"
                                        src={getUserImage(props.authorImage || '')}
                                        width="35"
                                        height="35"
                                    />
                                </a>
                            </Link>
                            <div className="vs mx-2">
                                <Link href="/[author]" as={`/@${props.author}`}><a className="deep-dark">{props.author}</a></Link>님이 작성함<br/>{props.createdDate} · <span className="shallow-dark">{props.readTime} min read</span>
                            </div>
                        </div>
                    )}
                </div>
            </Card>
        </div>
    )
}