export default {
    loadConversations(state, payload){
        state.conversations.push({
            ...payload.data,
            id: payload.id
        })
    },
    loadMsgs(state,payload){
        state.messages.unshift({
            ...payload.data,
            id: payload.id
        });
        // console.log('conv_id_state',state.current_conversation);
        // console.log('conv_id_state',payload.conv_id);

        if(state.current_conversation !== null || state.current_conversation !== ''){
            if(payload.data.conv_id == state.current_conversation){
                state.scrolldown_msg = true;
            }
        }
    },
    loadUnreadRecords(state,payload){
        state.unread_records.push({
            ...payload.data,
            id:payload.id
        });
    },
    clearUnreadMsg(state,payload){
        var indexArray = [];
        for(var i = 0; i< state.unread_records.length; i++){
            if(payload.conv_id == state.unread_records[i].conv_id){
                indexArray.push(i);
            }
        }
        // console.log('indexes',indexArray);
        for(var j=0;j<indexArray.length;j++){
            state.unread_records.splice(indexArray[j], 1);
        }
    },
    setCurrentConversation(state,conversation_id){
        state.current_conversation = conversation_id
    },
}