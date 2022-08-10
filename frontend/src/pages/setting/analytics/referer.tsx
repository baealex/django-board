import {
    useEffect,
    useState
} from 'react';
import Link from 'next/link';

import { Card } from '@design-system';
import type { PageComponent } from '@components';
import { SettingLayout } from '@system-design/setting';

import * as API from '@modules/api';

import { loadingStore } from '@stores/loading';

const AnalyticsSetting: PageComponent<unknown> = () => {
    const [ referers, setReferers ] = useState<API.GetSettingAnalyticsRefererResponseData>();

    useEffect(() => {
        loadingStore.start();
        Promise.all([
            API.getSettingAnalyticsReferrers()
                .then(({ data }) => setReferers(data.body))
        ]).then(() => {
            loadingStore.end();
        });
    }, []);

    return (
        <>
            {referers && (
                <>
                    <div className="h5 font-weight-bold mt-3 mb-3">
                        신규 외부 링크
                    </div>
                    <div className="row">
                        {referers.referers.map((item, idx) => (
                            <div key={idx} className="col-lg-12 mt-3">
                                <Card isRounded hasBackground className="mb-1">
                                    <div className="p-3">
                                        <div>
                                            <a className="deep-dark" href={item.url} target="blank">
                                                {item.title ? item.title : item.url}
                                            </a>
                                        </div>
                                        {item.description && (
                                            <div className="ns">
                                                <a className="shallow-dark" href={item.url} target="blank">
                                                    {item.description}
                                                </a>
                                            </div>
                                        )}
                                        <div className="ns gray-dark">
                                            {item.time}
                                        </div>
                                        <div className="mt-3">
                                            <Link href={`/@${item.posts.author}/${item.posts.url}`}>
                                                <a className="ns shallow-dark">
                                                    {`-> ${item.posts.title}`}
                                                </a>
                                            </Link>
                                        </div>
                                    </div>
                                </Card>
                            </div>
                        ))}
                    </div>
                </>
            )}
        </>
    );
};

AnalyticsSetting.pageLayout = (page) => (
    <SettingLayout active="analytics/referer">
        {page}
    </SettingLayout>
);

export default AnalyticsSetting;