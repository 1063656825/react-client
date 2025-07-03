import React from 'react'
import styles from '../styles/PageHeader.module.css'
type PageHeaderProps = {
    title: string;
    extra?: React.ReactNode;
}
export default function PageHeader(props: PageHeaderProps) {
  return (
    <div className={styles.row}>
        <div className={styles.pageHeader}>{ props.title}</div>
        {/* 分类选择 */}
        <div>

        </div>
    </div>
  )
}
