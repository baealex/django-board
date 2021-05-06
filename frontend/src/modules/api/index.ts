export * from './auth';
export * from './comments';
export * from './posts';
export * from './series';
export * from './setting';
export * from './tags';

import axios from 'axios';

axios.defaults.withCredentials = true;

import NProgress from 'nprogress';

import Config from '../config.json';

export const ERROR = {
    REJECT: 'error:RJ',
    EXPIRE: 'error:EP',
    NOT_LOGIN: 'error:NL',
    SAME_USER: 'error:SU',
    DIFF_USER: 'error:DU',
    OVER_FLOW: 'error:OF',
    ALREADY_VERIFY: 'error:AV',
    ALREADY_UNSYNC: 'error:AU',
    ALREADY_EXISTS: 'error:AE',
    NEED_TELEGRAM: 'error:NT',
    EMAIL_NOT_MATCH: 'error:EN',
    USERNAME_NOT_MATCH: 'error:UN',
};

type ErrorCode =
    'error:RJ' | 'error:EP' | 'error:NL' | 'error:SU' |
    'error:DU' | 'error:OF' | 'error:AV' | 'error:AU' |
    'error:AE' | 'error:NT' | 'error:EN' | 'error:UN' ;

export interface ResponseData<T> {
    status: 'DONE' | 'ERROR',
    errorCode?: ErrorCode,
    body: T
}

type DoneOrFail = 'DONE' | 'FAIL';

export function serializeObject(obj: {
    [key: string]: any
}) {
    return Object.keys(obj).reduce((acc, cur) => {
        return acc += `${cur}=${obj[cur] === undefined ? '' : encodeURIComponent(obj[cur])}&`;
    }, '').slice(0, -1);
}

export function objectToForm(obj: {
    [key: string]: any
}) {
    const form = new FormData();
    Object.keys(obj).forEach((item) => {
        form.append(item, obj[item]);
    });
    return form;
}

/* PROFILE */

export async function getUserProfile(author: string, includes: string[]) {
    return await axios({
        url: `${Config.API_SERVER}/v1/users/${encodeURIComponent(author)}?includes=${includes.join(',')}`,
        method: 'GET'
    });
}

export interface ProfileData {
    profile: {
        image: string;
        username: string;
        realname: string;
        bio: string;
    },
    social?: {
        username: string;
        github?: string;
        twitter?: string;
        youtube?: string;
        facebook?: string;
        instagram?: string;
    },
    heatmap?: {
        [key: string]: number;
    };
    tags?: {
        name: string;
        count: number;
    }[],
    view?: {
        today: number;
        yesterday: number;
        total: number;
    },
    most?: {
        url: string;
        title: string;
        image: string;
        readTime: number;
        createdDate: string;
        authorImage: string;
        author: string;
    }[],
    recent?: {
        type: string;
        text: string;
        url: string;
    }[],
}

export async function getUserData(author: string, get: string, fields: string[]) {
    return await axios({
        url: `${Config.API_SERVER}/v1/users/${encodeURIComponent(author)}?get=${get}&fields=${fields.join(',')}`,
        method: 'GET'
    });
}

export async function putUsername(username: string, newUsername: string) {
    NProgress.start();
    try {
        const response = await axios({
            url: `${Config.API_SERVER}/v1/users/@${encodeURIComponent(username)}`,
            method: 'PUT',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            data: serializeObject({
                username: username,
                new_username: newUsername
            }),
            withCredentials: true,
        });
        NProgress.done();
        return response;
    } catch(e) {
        NProgress.done();
        return e;
    }
}

export async function putAbout(author: string, aboutMarkdown: string, aboutMarkup: string) {
    NProgress.start();
    try {
        const response = await axios({
            url: `${Config.API_SERVER}/v1/users/${encodeURIComponent(author)}`,
            method: 'PUT',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            data: serializeObject({
                about: author,
                about_md: aboutMarkdown,
                about_html: aboutMarkup
            }),
            withCredentials: true,
        });
        NProgress.done();
        return response;
    } catch(e) {
        NProgress.done();
        return e;
    }
}

export async function telegram(parameter: 'unsync' | 'makeToken') {
    return await axios({
        url: `${Config.API_SERVER}/v1/telegram/${parameter}`,
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        withCredentials: true,
    });
}

export async function uploadImage(file: File) {
    const formData = new FormData();
    formData.append('image', file);
    NProgress.start();
    try {
        const formData = new FormData();
        formData.append('image', file);
        const response = await axios({
            url: `${Config.API_SERVER}/v1/image/upload`,
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            data: formData,
            withCredentials: true,
        });
        NProgress.done();
        return response;
    } catch(e) {
        NProgress.done();
        return e;
    }
}

export async function postForms(title: string, content: string) {
    return axios.request({
        url: `${Config.API_SERVER}/v1/forms`,
        method: 'POST',
        data: serializeObject({
            title,
            content,
        })
    })
};

export async function deleteForms(id: number) {
    return axios.request<DoneOrFail>({
        url: `${Config.API_SERVER}/v1/forms/${id}`,
        method: 'DELETE',
    })
};

export async function getForm(id: number) {
    return axios.request<GetFormData>({
        url: `${Config.API_SERVER}/v1/forms/${id}`,
        method: 'GET',
    })
}

export interface GetFormData {
    title: string;
    content: string;
}