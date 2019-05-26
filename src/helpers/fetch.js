const serverEndpoint = process.env.NODE_ENV === "development" ? "http://localhost" : `${process.env.REACT_APP_GOOGLE_SERVER_ENDPOINT}`
const port = "3000"
//login fetch
async function fetchLogin(loginUser) {
  return await fetch(`${serverEndpoint}:${port}/login`, {
    method: "POST",
    body: JSON.stringify(loginUser),
    headers: { "Content-Type": "application/json" }
  });
}


//signup fetch
async function fetchSignup(user) {
  return await fetch(`${serverEndpoint}:${port}/signup`, {
    method: "POST",
    body: JSON.stringify(user),
    headers: {
      "Content-Type": "application/json"
    }
  });
}
//signup idCheck fetch
async function fetchSignup_IdCheck(id) {
  return await fetch(`${serverEndpoint}:${port}/id/check?id=${id}`, {
    method: "GET"
  });
}
//signup nicknameCheck fetch
async function fetchSignup_NickNameCheck(nick_name) {
  return await fetch(
    `${serverEndpoint}:${port}/nickname/check?nick_name=${nick_name}`,
    {
      method: "GET"
    }
  );
}

// logout fetch
async function fetchLogout(token) {
  return await fetch(`${serverEndpoint}:${port}/logout`, {
    method: "GET",
    headers: {
      authorization: token
    }
  });
}
//미팅 디테일 fetch
async function fetchMeetingDetail(placeId, index) {
  let token = localStorage.getItem("token");
  console.log(token);

  if (token === null) {
    token = "";
  }
  return await fetch(
    `${serverEndpoint}:${port}/meetings/detail?meetingId=${index}&placeId=${placeId}`,
    {
      method: "GET",
      headers: {
        authorization: token
      }
    }
  );
}

async function fetchMeetingList(placeId) {
  return await fetch(
    `${serverEndpoint}:${port}/meetings/list/region?q=${placeId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    }
  );
}

//참가 등록
async function addMember(meetingId) {
  let token = localStorage.getItem("token");
  return await fetch(`${serverEndpoint}:${port}/meetings/new/member`, {
    method: "POST",
    body: JSON.stringify({ meetingId: meetingId }),
    headers: {
      "Content-Type": "application/json",
      authorization: token
    }
  });
}

//모임 삭제
async function deleteMeeting(meetingId) {
  let token = localStorage.getItem("token");
  return await fetch(`${serverEndpoint}:${port}/meetings/delete/meeting`, {
    method: "POST",
    body: JSON.stringify({ meetingId: meetingId }),
    headers: {
      "Content-Type": "application/json",
      authorization: token
    }
  });
}

//참가 취소
async function cancelMember(meetingId) {
  let token = localStorage.getItem("token");
  return await fetch(`${serverEndpoint}:${port}/meetings/cancel/member`, {
    method: "POST",
    body: JSON.stringify({ meetingId: meetingId }),
    headers: {
      "Content-Type": "application/json",
      authorization: token
    }
  });
}

async function fetchNickname() {
  let token = localStorage.getItem("token");
  return await fetch(`${serverEndpoint}:${port}/userNickname`, {
    method: "GET",
    headers: {
      authorization: token
    }
  });
}

async function createNewMeeting(data) {
  let token = localStorage.getItem("token");
  return await fetch(`${serverEndpoint}:${port}/meetings/new/meeting`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
      authorization: token
    }
  });
}

async function fetchMeetingLists(restaurantInfos) {
  return await fetch(`${serverEndpoint}:${port}/meetings/list/region`, {
    method: "POST",
    body: JSON.stringify({ restaurantInfos: restaurantInfos }),
    headers: {
      "Content-Type": "application/json"
    }
  })
}

async function getMyPageList(id) {
  return await fetch(`${serverEndpoint}:${port}/mypage`, {
    headers: {
      "Content-Type": "application/json",
      authorization: id
    }
  })
}
export default ({
  fetchLogin,
  fetchSignup,
  fetchSignup_IdCheck,
  fetchSignup_NickNameCheck,
  fetchLogout,
  fetchMeetingDetail,
  addMember,
  deleteMeeting,
  cancelMember,
  fetchNickname,
  createNewMeeting,
  fetchMeetingList,
  fetchMeetingLists,
  getMyPageList
});
