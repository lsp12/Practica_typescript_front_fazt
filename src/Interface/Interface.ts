import React from 'react'

export interface IVideos {
    id?: string;
    title: string;
    url: string;
    description: string;
    published_at?: Date;

}

export interface IParams{
    id:string;
}

export interface IPut extends IVideos {

}