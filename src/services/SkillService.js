import http from "./http-common";
const getAll = data => {
    return http.post("Skills", data);
  };
  const getSkillById = skillId => {
    return http.get(`Skills/${skillId}`);
  };
  const disableUserSkill = skillId => {
    return http.put(`/Skills/${skillId}/disable`, {});
  };
  const enableUserSkill = skillId => {
    return http.put(`/Skills/${skillId}/enable`, {});
  };
const SkillService = {
  getAll,
  getSkillById,
  disableUserSkill,
  enableUserSkill
};
export default SkillService;