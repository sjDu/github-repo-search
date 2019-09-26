const data = [
  {
    id: 76954504,
    owner: {
      avatar_url: "https://avatars2.githubusercontent.com/u/5383506?v=4",
      html_url: "https://github.com/chvin"
    },
    html_url: "https://github.com/chvin/react-tetris",
    full_name: "chvin/react-tetris",
    description: "Use React, Redux, Immutable to code Tetris. 🎮"
  },
  {
    id: 94079558,
    owner: {
      avatar_url: "https://avatars1.githubusercontent.com/u/12221718?v=4",
      html_url: "https://github.com/Binaryify"
    },
    html_url: "https://github.com/Binaryify/vue-tetris",
    full_name: "Binaryify/vue-tetris",
    description: "Use Vue, Vuex to code Tetris.使用 Vue, Vuex 做俄罗斯方块 "
  },
  {
    id: 19886948,
    owner: {
      avatar_url: "https://avatars0.githubusercontent.com/u/8196313?v=4",
      html_url: "https://github.com/Hextris"
    },
    html_url: "https://github.com/Hextris/hextris",
    full_name: "Hextris/hextris",
    description: "Fast paced HTML5 puzzle game inspired by Tetris!"
  },
  {
    id: 95875527,
    owner: {
      avatar_url: "https://avatars2.githubusercontent.com/u/10406525?v=4",
      html_url: "https://github.com/exyte"
    },
    html_url: "https://github.com/exyte/ARTetris",
    full_name: "exyte/ARTetris",
    description: "Augmented Reality Tetris made with ARKit and SceneKit"
  },
  {
    id: 20853547,
    owner: {
      avatar_url: "https://avatars0.githubusercontent.com/u/250750?v=4",
      html_url: "https://github.com/skidding"
    },
    html_url: "https://github.com/skidding/flatris",
    full_name: "skidding/flatris",
    description: "Fast-paced two-player web game"
  }
];

async function searchRepo(q, page = 1) {
  let url = "https://api.github.com/search/repositories?sort=stars&order=desc";

  if (q && q.length) {
    url += `&q=${q}`;
    // url += `&q=tetris`;
  }

  if (page) {
    url += `&page=${page}`;
  }

  let r = await fetch(url);
  const resumeTime = r.headers.get("X-RateLimit-Reset");
  const remaining = r.headers.get("X-RateLimit-Remaining");
  if (!r.ok) {
    console.warn("not ok", resumeTime, remaining);
    const isRateLimit = remaining === "0";
    throw { resumeTime, isRateLimit };
  }
  try {
    r = await r.json();
  } catch (error) {
    throw { resumeTime, error, isRateLimit: false };
  }

  // const r = await { items: data };
  console.log("result", { q, page }, r);
  window.r = r.items.map(it => {
    return {
      id: it.id,
      owner: {
        avatar_url: it.owner.avatar_url,
        html_url: it.owner.html_url
      },
      html_url: it.html_url,
      full_name: it.full_name,
      description: it.description
    };
  });
  return {
    ...r,
    resumeTime,
    total: r.total_count,
    page
  };

  // html_url
  // name
  // full_name
  // language
  // description
  // stargazers_count
  // watchers
  // forks

  // owner.avatar_url
  // owner.login  <= name
  // owner.html_url
}

export { searchRepo };
