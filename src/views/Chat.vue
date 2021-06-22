<template>
  <div class="container-fluid h-100">
    <br />
    <br />
    <div class="row justify-content-center h-100">
      <div class="col-md-4 col-xl-3 chat">
        <div class="card mb-sm-3 mb-md-0 contacts_card">
          <div class="card-header">
            <div class="input-group">
              <input
                type="text"
                placeholder="Search..."
                name=""
                class="form-control search"
                v-model="conv_search_key"
              />
              <div class="input-group-prepend">
                <span class="input-group-text search_btn"
                  ><i class="fas fa-search"></i
                ></span>
              </div>
            </div>
            <div style="margin-top: 5px; padding: 10px">
              <button
                style="
                  border: 1px solid black;
                  border-radius: 15px;
                  background-color: #82ccdd;
                "
                @click="createConversation"
              >
                Create Conversation
              </button>
            </div>
            <div>Unread({{ totalUnreadCount }})</div>
          </div>
          <div class="card-body contacts_body">
            <ul class="contacts">
              <li
                v-for="item in recentConversations"
                :key="item.id"
                class="active"
                @click="selectConversation(item.id)"
              >
                <div class="d-flex bd-highlight">
                  <div class="img_cont">
                    <img
                      src="https://static.turbosquid.com/Preview/001292/481/WV/_D.jpg"
                      class="rounded-circle user_img"
                    />
                    <span class="online_icon"></span>
                  </div>
                  <div class="user_info" style="width: 150px">
                    <span style="word-wrap: break-word">{{ item.title }}</span>
                    <!-- <p>Kalid is online</p> -->
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <div class="card-footer"></div>
        </div>
      </div>
      <div class="col-md-8 col-xl-6 chat">
        <div class="card">
          <div class="card-header msg_head">
            <div class="d-flex bd-highlight">
              <div class="img_cont">
                <img
                  src="https://static.turbosquid.com/Preview/001292/481/WV/_D.jpg"
                  class="rounded-circle user_img"
                />
                <span class="online_icon"></span>
              </div>
              <div class="user_info">
                <span>{{ getConversationTitle }}</span>
                <!-- <p>1767 Messages</p> -->
              </div>
              <div class="video_cam">
                <span><i class="fas fa-video"></i></span>
                <span><i class="fas fa-phone"></i></span>
              </div>
            </div>
            <span id="action_menu_btn"><i class="fas fa-ellipsis-v"></i></span>
            <div class="action_menu">
              <ul>
                <li><i class="fas fa-user-circle"></i> View profile</li>
                <li><i class="fas fa-users"></i> Add to close friends</li>
                <li><i class="fas fa-plus"></i> Add to group</li>
                <li><i class="fas fa-ban"></i> Block</li>
              </ul>
            </div>
          </div>
          <div class="card-body msg_card_body">
            <div
              v-bind:id="item.id"
              v-for="item in getMessageList"
              :key="item.id"
              v-bind:class="[
                'd-flex',
                item.sent_by === $store.state.user.user_id
                  ? 'justify-content-end'
                  : 'justify-content-start',
                'mb-4',
              ]"
            >
              <div class="img_cont_msg">
                <img
                  src="https://static.turbosquid.com/Preview/001292/481/WV/_D.jpg"
                  class="rounded-circle user_img_msg"
                />
              </div>
              <div
                class="msg_cotainer"
                v-bind:class="[
                  item.sent_by === $store.state.user.user_id
                    ? 'msg_cotainer'
                    : 'msg_cotainer_send',
                ]"
              >
                {{ item.msg_text }}
                <!-- <div class="msg_time">{{item.sent_at.toDate()}}</div> -->
              </div>
            </div>
          </div>
          <div class="card-footer">
            <div class="input-group">
              <div class="input-group-append">
                <span class="input-group-text attach_btn"
                  ><i class="fas fa-paperclip"></i
                ></span>
              </div>
              <textarea
                name=""
                class="form-control type_msg"
                placeholder="Type your message..."
                v-on:keyup.enter="sendMsg"
                v-model="msg_text"
              ></textarea>
              <div class="input-group-append">
                <span class="input-group-text send_btn"
                  ><i class="fas fa-location-arrow"></i
                ></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Chat",
  data() {
    return {
      msg_text: "",
      conv_search_key: "",
    };
  },
  created() {
    // Loads the messages from firestore database
    let user_info = this.$store.getters["userInfo"];
    let user_id = user_info.user_id;
    this.$store.dispatch("getConversations", user_id);
    this.$store.dispatch("getMsgs");
    this.$store.dispatch("getUnreadRecords", user_id);
  },
  computed: {
    getConversationTitle: function () {
      // Returns conversation title
      var conv_title = "";
      for (var i = 0; i < this.$store.state.chat.conversations.length; i++) {
        if (
          this.$store.state.chat.conversations[i].id ===
          this.$store.state.chat.current_conversation
        ) {
          conv_title = this.$store.state.chat.conversations[i].title;
        }
      }
      return conv_title;
    },
    getMessageList: function () {
      // Chat message list
      var messageList = [];
      for (var i = 0; i < this.$store.state.chat.messages.length; i++) {
        if (
          this.$store.state.chat.messages[i].conv_id ===
          this.$store.state.chat.current_conversation
        ) {
          messageList.push(this.$store.state.chat.messages[i]);
        }
      }
      return messageList;
    },
    totalUnreadCount: function () {
      // Returns unread message count
      return this.$store.state.chat.unread_records.length;
    },
    recentConversations: function () {
      // Returns recent conversation list
      if (this.conv_search_key == null || this.conv_search_key == "") {
        return this.$store.state.chat.conversations;
      } else {
        var convs = [];
        var lKey = this.conv_search_key.toLowerCase();
        for (var i = 0; i < this.$store.state.chat.conversations.length; i++) {
          var lTitle =
            this.$store.state.chat.conversations[i].title.toLowerCase();
          if (lTitle.includes(lKey)) {
            convs.push(this.$store.state.chat.conversations[i]);
          }
        }
        return convs;
      }
    },
  },
  methods: {
    selectConversation(conv_id) {
      // Sets current conversation
      this.$store.dispatch("setCurrentConversation", conv_id);
      let user_info = this.$store.getters["userInfo"];
      let user_id = user_info.user_id;
      var payload = {
        user_id: user_id,
        conv_id: conv_id,
      };

      this.$store.dispatch("clearUnreadMsg", payload);
    },
    createConversation() {
      // Creates a mock conversation
      var user_info = this.$store.getters["userInfo"];
      var user_id = parseInt(user_info.user_id, 10);
      var chat_with_user = user_id + 1;
      var msg =
        "This will create a Mock conversation between user id:" +
        user_id.toString() +
        " AND " +
        chat_with_user.toString() +
        " .Please login with the user id:" +
        chat_with_user.toString() +
        " from another browser to chat";
      alert(msg);

      var members = [user_id, chat_with_user];
      var conv_title = "Test conv:(" + user_id + "," + chat_with_user + ")";
      var conv_type = "connected";

      console.log(members);
      console.log(conv_title);
      console.log(conv_type);

      var newConv = {
        title: conv_title,
        type: conv_type,
        members: members,
        last_msg: "",
      };
      this.$store.dispatch("createConversation", newConv);
    },
    sendMsg() {
      // Sends msg
      console.log("enter pressed");
      var current_conv = this.$store.state.chat.current_conversation;
      if (current_conv == null || current_conv == "") {
        alert("Please select conversation");
      } else {
        var sent_by = this.$store.state.user.user_id;
        var msg_text = this.msg_text;
        var conv_id = this.$store.state.chat.current_conversation;
        var members = this.$store.getters["getChatMemberList"];
        var conv_type = this.$store.getters["getConversationType"];
        // console.log(members);
        var sent_at = new Date();
        var new_msg = {
          conv_id: conv_id,
          msg_text: msg_text,
          sent_by: sent_by,
          sent_at: sent_at,
        };

        var payload = {
          sent_by: sent_by,
          msg_text: msg_text,
          conv_id: conv_id,
          members: members,
          conv_type: conv_type,
          new_msg: new_msg,
        };
        this.$store.dispatch("sendMsg", payload);
        this.msg_text = "";
      }
    },
  },
};
</script>


<style>
body,
html {
  height: 100%;
  margin: 0;
  background: #7f7fd5;
  background: -webkit-linear-gradient(to right, #91eae4, #86a8e7, #7f7fd5);
  background: linear-gradient(to right, #91eae4, #86a8e7, #7f7fd5);
}

.chat {
  margin-top: auto;
  margin-bottom: auto;
}
.card {
  height: 500px;
  border-radius: 15px !important;
  background-color: rgba(0, 0, 0, 0.4) !important;
}
.contacts_body {
  padding: 0.75rem 0 !important;
  overflow-y: auto;
  white-space: nowrap;
}
.msg_card_body {
  overflow-y: auto;
  display: flex;
  flex-direction: column-reverse;
}
.card-header {
  border-radius: 15px 15px 0 0 !important;
  border-bottom: 0 !important;
}
.card-footer {
  border-radius: 0 0 15px 15px !important;
  border-top: 0 !important;
}
.container {
  align-content: center;
}
.search {
  border-radius: 15px 0 0 15px !important;
  background-color: rgba(0, 0, 0, 0.3) !important;
  border: 0 !important;
  color: white !important;
}
.search:focus {
  box-shadow: none !important;
  outline: 0px !important;
}
.type_msg {
  background-color: rgba(0, 0, 0, 0.3) !important;
  border: 0 !important;
  color: white !important;
  height: 60px !important;
  overflow-y: auto;
}
.type_msg:focus {
  box-shadow: none !important;
  outline: 0px !important;
}
.attach_btn {
  border-radius: 15px 0 0 15px !important;
  background-color: rgba(0, 0, 0, 0.3) !important;
  border: 0 !important;
  color: white !important;
  cursor: pointer;
}
.send_btn {
  border-radius: 0 15px 15px 0 !important;
  background-color: rgba(0, 0, 0, 0.3) !important;
  border: 0 !important;
  color: white !important;
  cursor: pointer;
}
.search_btn {
  border-radius: 0 15px 15px 0 !important;
  background-color: rgba(0, 0, 0, 0.3) !important;
  border: 0 !important;
  color: white !important;
  cursor: pointer;
}
.contacts {
  list-style: none;
  padding: 0;
}
.contacts li {
  width: 100% !important;
  padding: 5px 10px;
  margin-bottom: 15px !important;
}
.active {
  background-color: rgba(0, 0, 0, 0.3);
}
.user_img {
  height: 70px;
  width: 70px;
  border: 1.5px solid #f5f6fa;
}
.user_img_msg {
  height: 40px;
  width: 40px;
  border: 1.5px solid #f5f6fa;
}
.img_cont {
  position: relative;
  height: 70px;
  width: 70px;
}
.img_cont_msg {
  height: 40px;
  width: 40px;
}
.online_icon {
  position: absolute;
  height: 15px;
  width: 15px;
  background-color: #4cd137;
  border-radius: 50%;
  bottom: 0.2em;
  right: 0.4em;
  border: 1.5px solid white;
}
.offline {
  background-color: #c23616 !important;
}
.user_info {
  margin-top: auto;
  margin-bottom: auto;
  margin-left: 15px;
}
.user_info span {
  font-size: 20px;
  color: white;
}
.user_info p {
  font-size: 10px;
  color: rgba(255, 255, 255, 0.6);
}
.video_cam {
  margin-left: 50px;
  margin-top: 5px;
}
.video_cam span {
  color: white;
  font-size: 20px;
  cursor: pointer;
  margin-right: 20px;
}
.msg_cotainer {
  margin-top: auto;
  margin-bottom: auto;
  margin-left: 10px;
  border-radius: 25px;
  background-color: #82ccdd;
  padding: 10px;
  position: relative;
  float: right;
}
.msg_cotainer_send {
  margin-top: auto;
  margin-bottom: auto;
  margin-right: 10px;
  border-radius: 25px;
  background-color: #78e08f;
  padding: 10px;
  position: relative;
  float: left;
}
.msg_time {
  position: absolute;
  left: 0;
  bottom: -15px;
  color: rgba(255, 255, 255, 0.5);
  font-size: 10px;
}
.msg_time_send {
  position: absolute;
  right: 0;
  bottom: -15px;
  color: rgba(255, 255, 255, 0.5);
  font-size: 10px;
}
.msg_head {
  position: relative;
}
#action_menu_btn {
  position: absolute;
  right: 10px;
  top: 10px;
  color: white;
  cursor: pointer;
  font-size: 20px;
}
.action_menu {
  z-index: 1;
  position: absolute;
  padding: 15px 0;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  border-radius: 15px;
  top: 30px;
  right: 15px;
  display: none;
}
.action_menu ul {
  list-style: none;
  padding: 0;
  margin: 0;
}
.action_menu ul li {
  width: 100%;
  padding: 10px 15px;
  margin-bottom: 5px;
}
.action_menu ul li i {
  padding-right: 10px;
}
.action_menu ul li:hover {
  cursor: pointer;
  background-color: rgba(0, 0, 0, 0.2);
}
@media (max-width: 576px) {
  .contacts_card {
    margin-bottom: 15px !important;
  }
}
</style>