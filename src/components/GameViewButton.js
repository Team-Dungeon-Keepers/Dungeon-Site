import { useHistory } from "react-router";
import React from "react";

function GameViewButton(props) {
    //console.log(props);

    // const viewGameID = {
    //     id: props.gameID
    // }

    let history = useHistory();

    function PushToGameView (id){
        console.log("pushing harder!")
        console.log(id)
        window.sessionStorage.setItem("gameID", id);
        history.push("/gameview");
    }

    return (
        <button type='button' id='viewBtn' onClick={() => PushToGameView(props.gameID)}>View</button>
        )
}
export default GameViewButton;