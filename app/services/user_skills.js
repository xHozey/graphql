import { formatType } from "../utils/helpers.js";
const initSkill = (type, amout) => {
  const div = document.createElement("div");
  div.classList.add("skill");
  div.innerHTML = `
    <div class="skill-header">
          <div class="skill-name">
            ${type}
          </div>
          <span class="skill-percentage">${amout}%</span>
        </div>
        <div class="skill-bar-container">
          <div class="skill-bar" style="width: ${amout}%"></div>
        </div>
    `;
  return div;
};

export const userSkills = async (skills) => {
  const skillsContainer = document.querySelector(".skill");
  const filterDuplicate = {};
  skills.forEach((skill) => {
    if (!filterDuplicate[skill.type]) {
      filterDuplicate[skill.type] = skill.amount;
      skillsContainer.append(initSkill(formatType(skill.type), skill.amount));
    }
  });
};
