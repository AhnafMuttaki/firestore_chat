export default {
    getChatMemberList(state){
      var members = [];
      var conv_id = state.current_conversation;
      for(var i=0;i<state.conversations.length;i++){
        if(state.conversations[i].id === conv_id){
          members = state.conversations[i].members;
        }
      }
      return members;
    },
    getConversationType(state){
      var type = '';
      var conv_id = state.current_conversation;
      for(var i=0;i<state.conversations.length;i++){
        if(state.conversations[i].id === conv_id){
          type = state.conversations[i].type;
        }
      }
      
      return type;
    }
  };
  