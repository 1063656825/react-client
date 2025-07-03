import request from "./request";
import { IssueParams } from "../types/issue";

/**
 * 分页获取问答
 */
export function getIssueByPage(params: IssueParams) {
  return request({
    url: "/api/issue",
    method: "GET",
    params: {
      ...params,
    },
  });
}

