import axios from "axios";

const privateToken = "<your-token-here>";

export module gitService {
  export async function getGitInfo(addr: string, flavour: string, id: string) {
    const addrArray = addr.split("/");
    let readme = null;
    let repoName = null;
    let repoDescription = null;

    switch (flavour) {
      case "gitlab":
        const giturl = addrArray[0] + "//" + addrArray[2];

        try {
          const { data }: any = await axios.get(
            `${giturl}/api/v4/projects/${id}/repository/files/README.md/raw?ref=master`,
            {
              headers: {
                "PRIVATE-TOKEN": privateToken,
              },
            }
          );

          readme = data;
        } catch (error) {
          console.error(error);
        }

        try {
          const { data } = await axios.get(`${giturl}/api/v4/projects/${id}`, {
            headers: {
              "PRIVATE-TOKEN": privateToken,
            },
          });

          repoDescription = data.description;
          repoName = data.name;
        } catch (error) {
          console.error(error);
        }
        break;
      case "github":
        const owner = addrArray[3];
        const repo = addrArray[4].split(".")[0];

        if (owner && repo) {
          try {
            const readmeData: any = await axios.get(
              `https://raw.githubusercontent.com/${owner}/${repo}/master/README.md`
            );
            readme = readmeData.data;
          } catch (error) {
            console.log(error);
          }

          const { data } = await axios.get(
            `https://api.github.com/repos/${owner}/${repo}`
          );

          repoName = data.name;
          repoDescription = data.description;
        }
        break;

      default:
        console.error("Unsupported git flavour");
        break;
    }

    return { readme, repoName, repoDescription };
  }

  export async function getGitBranches(
    addr: string,
    flavour: string,
    id: string
  ) {
    const addrArray = addr.split("/");
    let branches = null;

    switch (flavour) {
      case "gitlab":
        let giturl = addrArray[0] + "//" + addrArray[2];

        const branchesData = await axios.get(
          `${giturl}/api/v4/projects/${id}/repository/branches`,
          {
            headers: {
              "PRIVATE-TOKEN": privateToken,
            },
          }
        );

        branches = branchesData.data;
        break;
      case "github":
        let owner = addrArray[3];
        let repo = addrArray[4].split(".")[0];

        if (owner && repo) {
          const branchesData: any = await axios.get(
            `https://api.github.com/repos/${owner}/${repo}/branches`,
            {
              headers: {
                "PRIVATE-TOKEN": privateToken,
              },
            }
          );

          branches = branchesData.data;
        }
        break;

      default:
        console.error("Unsupported git flavour");
        break;
    }

    return branches;
  }

  export async function getGitCommitsByBranch(
    branchID: string,
    addr: string,
    id: string,
    flavour: string
  ) {
    const addrArray = addr.split("/");
    let commits = null;
    let giturl;

    switch (flavour) {
      case "gitlab":
        giturl = addrArray[0] + "//" + addrArray[2];

        const { data } = await axios.get(
          `${giturl}/api/v4/projects/${id}/repository/commits`,
          {
            params: {
              ref_name: branchID,
            },
            headers: {
              "PRIVATE-TOKEN": privateToken,
            },
          }
        );

        commits = data;
        break;

      case "github":
        let owner = addrArray[3];
        let repo = addrArray[4].split(".")[0];

        if (owner && repo) {
          const { data } = await axios.get(
            `https://api.github.com/repos/${owner}/${repo}/commits`,
            {
              params: {
                sha: branchID,
              },
            }
          );

          commits = data;
        }
        break;

      default:
        break;
    }

    const formattedCommits = await formatCommits(commits, flavour, addr);
    return formattedCommits;
  }
}

async function formatCommits(commits: any, flavour: string, addr: string) {
  const addrArray = addr.split("/");
  let rawDate: Date;
  let date: string;
  let formattedCommits: any = [];

  switch (flavour) {
    case "gitlab":
      formattedCommits = await Promise.all(
        commits.map(async (commit, i) => {
          let formattedCommit = {};
          let giturl = addrArray[0] + "//" + addrArray[2];
          rawDate = new Date(commit.committed_date);
          date =
            rawDate.getDate() +
            "/" +
            (rawDate.getMonth() + 1) +
            "/" +
            rawDate.getFullYear();

          const avatar = await axios.get(`${giturl}/api/v4/avatar`, {
            headers: {
              "PRIVATE-TOKEN": privateToken,
            },
            params: {
              size: "64",
              email: commit.committer_email,
            },
          });

          formattedCommit = {
            date,
            title: commit.title,
            author_name: commit.author_name,
            author_avatar: avatar.data.avatar_url,
          };

          return formattedCommit;
        })
      );
      break;

    case "github":
      formattedCommits = commits.map((commit, i) => {
        rawDate = new Date(commit.commit.author.date);
        date =
          rawDate.getDate() +
          "/" +
          (rawDate.getMonth() + 1) +
          "/" +
          rawDate.getFullYear();
        commit = {
          date,
          title: commit.commit.message,
          author_name: commit.author.login,
          author_avatar: commit.author.avatar_url,
        };

        return commit;
      });
      break;

    default:
      console.error(`Unsupported git flavour`);
      break;
  }

  return formattedCommits;
}
