export interface IssueParams {
    current: number,
    pageSize: number,
    issueStatus: boolean
}

export interface PageInfo {
    total: number,
    current: number,
    pageSize: number
}

export interface PageInfoIssueShowParams extends IssueParams {
    pageInfo: PageInfo
}

export interface Issue {
    id: String, // mongodb 自动生成的 id
    issueTitle: String, // 问题标题
    issueContent: String, // 问题描述
    issuePic: String, // 问题图片
    scanNumber: Number, //	问题浏览量
    commentNumber: Number, //	评论数
    issueStatus: Boolean, //	问题状态
    issueDate: String, //	问题时间
    userId: string, //	用户 id
    typeId: string, //  所属分类
}