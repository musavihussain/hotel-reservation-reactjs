import React, { Component } from 'react'
import items from './data';

const RoomContext = React.createContext();

class RoomProvider extends Component {
    state = {
        rooms: [],
        sortedRooms: [],
        featuredRooms: [],
        loading: true,
        type: 'all',
        capacity: 1,
        price:0,
        minPrice:0,
        maxPrice:0,
        minSize:0,
        maxSize:0,
        breakfast:false,
        petes:false        
    }

    // getData()

    componentDidMount() {
        // this.getData
        let rooms = this.formatData(items)
        let featuredRooms = rooms.filter(room => room.featured === true);
        let maxPrice = Math.max(...rooms.map(item => item.price));
        let maxSize = Math.max(...rooms.map(item => item.size));
        
        this.setState({
            rooms: rooms,
            featuredRooms: featuredRooms,
            sortedRooms: rooms,
            loading: false,
            maxPrice:maxPrice,
            maxSize:maxSize,
        });
    }


    formatData(data) {
        let tempItems = items.map(item => {
            let id = item.sys.id;
            let images = item.fields.images.map(image => image.fields.file.url);
            // Storing all item fields inn room and replacing images of fields with above created images
            let room = {...item.fields, images:images, id}
            return room;
        })
        return tempItems;
    }

    getRoom = (slug) => {
        let tempRooms = [...this.state.rooms];
        const room = tempRooms.find(room => room.slug === slug);

        return room;
    }

    handleChange = event => {
        const target = event.target 
        const type = event.target.type
        const name = event.target.name
        const value = event.type === 'checkbox' ? target.checked : target.value
        this.setState({
            [name]: value
        }, this.filterRooms)

        
    }

    filterRooms = () => {
        let {
            rooms, 
            type, 
            capacity, 
            price, 
            minSize, 
            maxSize, 
            breakfast, 
            pets
        } = this.state;

        // All Rooms
        let tempRooms = [...rooms];

        // Transform Values
        capacity = parseInt(capacity);
        price = parseInt(price)

        // Filter by Type
        if(type !== 'all') {
            tempRooms = tempRooms.filter(room => room.type === type)
        }

        // Filter by Capacity
        if(capacity !== 1) {
            tempRooms = tempRooms.filter(room => room.capacity >= capacity)
        }

        // Filter by Price
        tempRooms = tempRooms.filter(room => room.price <= price)

        this.setState({
            sortedRooms: tempRooms
        })


    }
    render() {
        return (
            <RoomContext.Provider value={{...this.state, getRoom: this.getRoom, handleChange:this.handleChange }}>
                {this.props.children}
                </RoomContext.Provider>
        )
    }
}


const RoomConsumer = RoomContext.Consumer;

export function withRoomConsumer(Component) {
    return function ConsumerWrapper(props) {
        return <RoomConsumer>
            {value => <Component {...props} context={value}/>}
        </RoomConsumer>
    } 
}

export {RoomProvider, RoomConsumer, RoomContext}