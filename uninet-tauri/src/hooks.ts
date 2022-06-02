import cookie from 'cookie';
import { v4 as uuid } from '@lukeed/uuid';
import MongoStore from 'connect-mongo'
import express from 'express'
import session from 'express-session';
import { dev } from '$app/env';
import type { GetSession, Handle, } from '@sveltejs/kit';

const rootDomain = "http://127.0.0.1:4000"; // or your server IP for dev
const originURL = "http://127.0.0.1:4000"; // or your server IP for dev

export const ssr = false;

import { MemoryStore } from 'express-session';

const headers = {
	"X-Frame-Options": "SAMEORIGIN",
	"Referrer-Policy": "no-referrer",
	"Access-Control-Allow-Origin": dev ? "*" : originURL,
	"Permissions-Policy": `accelerometer=(), autoplay="*", camera=(), document-domain=(), encrypted-media=(), fullscreen=(), gyroscope=(), interest-cohort=(), magnetometer=(), microphone=(), midi=(), payment=(), picture-in-picture=(), publickey-credentials-get=(), sync-xhr=(), usb=(), xr-spatial-tracking=(), geolocation=()`,
	"X-Content-Type-Options": "nosniff",
	"Strict-Transport-Security": "max-age=31536000; includeSubDomains; preload"
};

const checkUserAgent = (userAgent: string) =>
	/i(Phone|Pad|Pod)/i.test(userAgent);

export const handle: Handle = async ({ event, resolve }) => {
	event.locals.iOS = checkUserAgent(event.request.headers.get("User-Agent"));

	const response = await resolve(event);
	Object.entries(headers).forEach(([key, value]) =>
		response.headers.set(`${key}`, `${value}`)
	);

	return response;
};

export const getSession: GetSession = (event) => {
	return event.locals.iOS
		? {
				iOS: event.locals.iOS
		  }
		: {};
};


/* 
const checkUserAgent = (userAgent: string) =>
	/i(Phone|Pad|Pod)/i.test(userAgent);

export const handle: Handle = async ({ event, resolve }) => {
	// console.log(event.request.headers.get('User-Agent'));
	event.locals.iOS = checkUserAgent(event.request.headers.get('User-Agent'));
	const response = await resolve(event);
	Object.entries(headers).forEach(([key, value]) =>
		response.headers.set(`${key}`, `${value}`)
	);

	return response;
};

export const getSession: GetSession = (event) => {
	return event.locals.iOS
		? {
				iOS: event.locals.iOS
		  }
		: {};
};
*/


const app = express()


/* 
const db = app.use(session({
    resave: false,
    saveUninitialized: true,
    name: 'sid',
    secret: 'some secret',
    store: MongoStore.create({ 
    mongoUrl: 'mongodb+srv://ryuk:jz1234@sessions.mnty4.mongodb.net/myFirstDatabase?retryWrites=true&w=majority' }),
    cookie: {
        maxage: 99 * 99,
        samesite: false,
        secure: false,
        httpOnly: true
    }
}))
*/

/*
export async function getContext({headers}) {
    const cookies = cookie.parse(headers.cookie || '')

    if(!cookies.sessionID) {
        return {
            authenticated: false,
        }
    }

    const userSession = JSON.parse(await db.get(cookies.sessionID))

    if(!userSession) {
        return {
            authenticated: true,
            email: userSession.email,
            password: userSession.password
        }
    } else {
        return {
            authenticated: false,
        }
    }
}

export function getSession({context}) {
    if(!context.authenticated) {
        return {
            authenticated: context.authenticated,
        }
    }
    return {
        authenticated: context.authenticated,
        email: context.email,
        password: context.password
    }
}
*/