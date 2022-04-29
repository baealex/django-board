import type { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import React from 'react';

import {
    Pagination,
    SEO
} from '@system-design/shared';
import {
    ProfileLayout,
    UserArticles
} from '@system-design/profile';

import * as API from '@modules/api';

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const {
        author = '',
        page = 1,
    } = context.query;

    try {
        if (!author.includes('@')) {
            throw 'invalid author';
        }

        const userProfile = await API.getUserProfile(author as string, [
            'profile',
            'social',
            'tags'
        ]);
        
        const userPosts = await API.getUserPosts(
            author as string, 
            Number(page),
        );

        return {
            props: {
                page,
                tag: 'all',
                ...userProfile.data.body,
                ...userPosts.data.body
            }
        };
    } catch (error) {
        return {
            notFound: true
        };
    }
}

interface Props extends API.GetUserProfileData, API.GetUserPostsData {
    page: number;
    tag: string;
}

export default function UserPosts(props: Props) {
    return (
        <>
            <Head>
                <title>{props.profile.username} ({props.profile.realname}) —  Posts</title>
            </Head>
            <SEO
                title={`${props.profile.username} (${props.profile.realname}) —  Posts`}
                image={props.profile.image}
                description={`${props.profile.realname}님이 작성한 모든 포스트를 만나보세요.`}
            />
            <Pagination
                page={props.page}
                last={props.lastPage}
            />
        </>
    );
}

UserPosts.pageLayout = (page: JSX.Element, props: Props) => (
    <ProfileLayout
        active="posts"
        profile={props.profile}
        social={props.social}
    >
        <div className="container">
            <UserArticles
                allCount={props.allCount}
                active={props.tag}
                author={props.profile.username}
                tags={props.tags!}
                posts={props.posts}
            >
                {page}
            </UserArticles>
        </div>
    </ProfileLayout>
);