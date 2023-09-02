export type Timestamp = string
export type Severity =
  | {
      type: "CVSS_V2" | "CVSS_V3"
      score: string
      [k: string]: unknown
    }[]
  | null

/**
 * A schema for describing a vulnerability in an open source package.
 * source: https://github.com/ossf/osv-schema/blob/main/validation/schema.json
 */
export interface OpenSourceVulnerability {
  schema_version?: string
  id: string
  modified: Timestamp
  published?: Timestamp
  withdrawn?: Timestamp
  aliases?: string[] | null
  related?: string[]
  summary?: string
  details?: string
  severity?: Severity
  affected?:
    | {
        package?: {
          ecosystem: string
          name: string
          purl?: string
          [k: string]: unknown
        }
        severity?: Severity
        ranges?: ({
          [k: string]: unknown
        } & {
          [k: string]: unknown
        })[]
        versions?: string[]
        ecosystem_specific?: {
          [k: string]: unknown
        }
        database_specific?: {
          [k: string]: unknown
        }
        [k: string]: unknown
      }[]
    | null
  references?:
    | {
        type:
          | "ADVISORY"
          | "ARTICLE"
          | "DETECTION"
          | "DISCUSSION"
          | "REPORT"
          | "FIX"
          | "INTRODUCED"
          | "GIT"
          | "PACKAGE"
          | "EVIDENCE"
          | "WEB"
        url: string
        [k: string]: unknown
      }[]
    | null
  credits?: {
    name: string
    contact?: string[]
    type?:
      | "FINDER"
      | "REPORTER"
      | "ANALYST"
      | "COORDINATOR"
      | "REMEDIATION_DEVELOPER"
      | "REMEDIATION_REVIEWER"
      | "REMEDIATION_VERIFIER"
      | "TOOL"
      | "SPONSOR"
      | "OTHER"
    [k: string]: unknown
  }[]
  database_specific?: {
    [k: string]: unknown
  }
}
