import axios from "axios";

export module pluginService {
  export function getPluginButtons() {
    return new Promise((resolve, reject) => {
      axios
        .get("/plugins")
        .then(({ data }) => resolve(data))
        .catch((error) => reject(error));
    });
  }

  export async function getGitInfo(addr: string) {
    const addrArray = addr.split("/");
    const flavour = addrArray[2].split(".")[0];
    let owner = null;
    let repo = null;
    let readme = null;
    let description = null;

    if (flavour == "github") {
      owner = addrArray[3];
      repo = addrArray[4].split(".")[0];

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
        description = data.description;
      }
    }

    return { readme, description };
  }

  export async function getGitBranches(addr: string) {
    const addrArray = addr.split("/");
    const flavour = addrArray[2].split(".")[0];
    let owner = null;
    let repo = null;
    let branches = null;

    if (flavour == "github") {
      owner = addrArray[3];
      repo = addrArray[4].split(".")[0];

      if (owner && repo) {
        const branchesData: any = await axios.get(
          `https://api.github.com/repos/${owner}/${repo}/branches`
        );
        branches = branchesData.data;
      }
      return branches;
    }
  }

  export async function getGitCommitsByBranch(branch: string, addr: string) {
    const addrArray = addr.split("/");
    const flavour = addrArray[2].split(".")[0];
    let owner = null;
    let repo = null;
    let branches = null;
    if (flavour == "github") {
      owner = addrArray[3];
      repo = addrArray[4].split(".")[0];

      if (owner && repo) {
        const { data } = await axios.get(
          `https://api.github.com/repos/${owner}/${repo}/commits\?sha\=${branch}`
        );
        branches = data;
      }
    }

    return branches;
  }
}
