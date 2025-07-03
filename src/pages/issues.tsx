import { useState, useEffect } from "react";
import PageHeader from '../components/PageHeader'
import styles from '../styles/Issue.module.css'
import { getIssueByPage } from '../api/issue'
import { PageInfo, Issue } from '../types/issue'
export default function Issues() {
  const [issueList, setIssueList] = useState<Issue[]>([]);
  const [issueParams, setIssueParams] = useState<PageInfo>({
    current: 1,
    pageSize: 10,
    total: 0
  });

  useEffect(() => {
    const getIssueList = async () => {
      const res = await getIssueByPage({
        current: issueParams.current,
        pageSize: issueParams.pageSize,
        issueStatus: true
      });
      setIssueParams({
        ...issueParams,
        total: res.data.totalPage
      });
      setIssueList(res.data.data);
    }
    getIssueList();
  }, [issueParams.current, issueParams.pageSize]);
  return (
    <div>
      <PageHeader title="问答" />
      <div className={styles.issueContainer}> 
        <div className={styles.leftSide}>
          {Array.isArray(issueList) && issueList.map(item => {
            return (
              <div className={styles.issueItem} key={item.id as string}>
                <div className={styles.issueTitle}>{item.issueTitle}</div>
                <div className={styles.issueContent}>{item.issueContent}</div>
                <div className={styles.issuePic}>{item.issuePic}</div>
              </div>
            )
          })}
        </div>
        <div className={styles.rightSide}></div>
      </div>
    </div>
  )
}
