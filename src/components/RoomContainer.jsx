import React from 'react'
import RoomsFilter from './RoomsFilter'
import RoomList from './RoomList'
import {withRoomConsumer} from '../context';
import Loading from '../components/Loading';


function RoomContainer({context}) {
    const {loading, sortedRooms, rooms}  = context
    if(loading) {
        return <Loading/>
    }
    return (<div>
        Hello from rooms container
        <RoomsFilter rooms={rooms}/>
        <RoomList rooms={sortedRooms}/>
    </div>)

}

export default withRoomConsumer(RoomContainer)
 

// import React from 'react'
// import RoomsFilter from './RoomsFilter'
// import RoomList from './RoomList'
// import {RoomConsumer} from '../context';
// import Loading from '../components/Loading';

// export default function RoomContainer() {
//     return (
//         <RoomConsumer>
//             {
//                 (value) => {
//                     const {loading, sortedRooms, rooms}  = value

//                     if(loading) {
//                         return <Loading/>
//                     }
//                     return (<div>
//                         Hello from rooms container
//                         <RoomsFilter rooms={rooms}/>
//                         <RoomList rooms={sortedRooms}/>
//                     </div>)
//                 }
//             }
//         </RoomConsumer>
        
//     )
// }
