import {
    ArticleCardSmall,
    ArticleCardSmallProps,
} from '@system-design/article';

export interface FeaturedArticlesProps {
    articles: ArticleCardSmallProps[];
}

export function FeaturedArticles(props: FeaturedArticlesProps) {
    return (
        <>
            {props.articles.length > 0 && (
                <>
                    <div className="h5 font-weight-bold mt-5">
                        추천 컨텐츠
                    </div>
                    <div className="row mt-1 mb-5">
                        {props.articles.map((article, idx) => (
                            <ArticleCardSmall key={idx} {...article}/>
                        ))}
                    </div>
                </>
            )}
        </>
    )
}