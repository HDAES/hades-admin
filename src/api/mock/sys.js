import request from '@/utils/http'
export function postLogin(data) {
  return request({
    url: '/login',
    method: 'post',
    isMock: true,
    data
  })
}
export function getUserInfo() {
  return request({
    url: '/getUserInfo',
    method: 'GET',
    isMock: true
  })
}
//# sourceMappingURL=sys.js.map
