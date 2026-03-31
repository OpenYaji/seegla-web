# Agent Skill Specification: Data Analytics

This document defines the analytical capabilities and toolsets for the **Data Analysis Agent**. These skills enable the agent to transform raw project data into actionable insights for wellness platforms, management systems, and research initiatives.

---

## 1. Descriptive Analytics (Contextual Summarization)
*Purpose: To interpret historical data and provide a "state of the union" for the project.*

| Skill ID | Skill Name | Technical Capability |
| :--- | :--- | :--- |
| **DA-01** | **Statistical Profiling** | Calculates distributions, central tendencies (mean/median), and variance for numerical datasets. |
| **DA-02** | **Segmentation Logic** | Categorizes entities (users, students, or clients) based on behavioral or demographic metadata. |
| **DA-03** | **Temporal Aggregation** | Resamples time-series data to identify patterns across days, weeks, or months. |

---

## 2. Diagnostic Analytics (Root Cause Identification)
*Purpose: To determine the "why" behind specific data trends or system anomalies.*

### Correlation Assessment
The agent evaluates the relationship between two independent variables (e.g., wellness activity vs. employee burnout scores) using the Pearson correlation coefficient:

$$r = \frac{\sum (x_i - \bar{x})(y_i - \bar{y})}{\sqrt{\sum (x_i - \bar{x})^2 \sum (y_i - \bar{y})^2}}$$

### Anomaly Detection
* **Outlier Identification:** Uses Interquartile Range (IQR) or Z-score thresholds to flag data points that deviate from expected norms.
* **Error Pattern Recognition:** Scans system logs to identify clusters of failures or unexpected drops in user engagement.

[Image of the data analysis process cycle]

---

##