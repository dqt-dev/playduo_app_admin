import http from "./http-common";
const getAll = data => {
    return http.post("Skills", data);
  };
  const getSkillById = skillId => {
    return http.get(`Skills/${skillId}`);
  };
  const disableUserSkill = userId => {
    return http.put(`/Skills/${userId}/disable`, {});
  };
  const enableUserSkill = userId => {
    return http.put(`/Skills/${userId}/enable`, {});
  };
const SkillService = {
  getAll,
  getSkillById,
  disableUserSkill,
  enableUserSkill
};
export default SkillService;