import { MAX_DIRECT_REFERRALS } from "./referralLimits";

export function buildReferralTree(rootUserId, users) {
  if (!rootUserId || !users.length) {
    return null;
  }

  const userById = new Map(users.map((user) => [user.id, user]));

  function buildNode(userId, visited = new Set()) {
    if (visited.has(userId)) {
      return null;
    }

    const user = userById.get(userId);
    if (!user) {
      return null;
    }

    const nextVisited = new Set(visited);
    nextVisited.add(userId);

    const children = users
      .filter((candidate) => candidate.parent_id === userId)
      .map((child) => buildNode(child.id, nextVisited))
      .filter(Boolean)
      .slice(0, MAX_DIRECT_REFERRALS);

    return {
      ...user,
      children,
    };
  }

  return buildNode(rootUserId);
}

export function getRootProfiles(users) {
  const ids = new Set(users.map((user) => user.id));
  return users.filter((user) => !user.parent_id || !ids.has(user.parent_id));
}

export function hasReferralChildren(userId, users) {
  return users.some((user) => user.parent_id === userId);
}

/** Members with no referrer and no one under them — shown individually in admin. */
export function getStandaloneProfiles(users) {
  return users.filter(
    (user) => !user.parent_id && !hasReferralChildren(user.id, users),
  );
}

export function getNetworkRoots(users) {
  const standaloneIds = new Set(getStandaloneProfiles(users).map((user) => user.id));
  return getRootProfiles(users).filter((root) => !standaloneIds.has(root.id));
}

export function buildReferralForest(users) {
  return getNetworkRoots(users)
    .map((root) => buildReferralTree(root.id, users))
    .filter(Boolean);
}

export function countDescendants(node) {
  if (!node?.children?.length) {
    return 0;
  }

  return node.children.reduce((total, child) => total + 1 + countDescendants(child), 0);
}
