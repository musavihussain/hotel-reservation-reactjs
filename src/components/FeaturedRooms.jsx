import React, { Component } from 'react'
import {RoomContext} from '../context';

export default class FeaturedRooms extends Component {
    static  contextType = RoomContext;

    render() {
        const {name, position} = this.context
        return (
            <div>
                Hello from featured rooms {name}
            </div>
        )
    }
}
