const router = require('express').Router();

const { getTalkers, setTalkers } = require('../utils/talkerUtils');
const { tokenValidation } = require('../middlewares/tokenMiddleware');
const { validateName, validateAge,
validateTalk, validateTalkFields } = require('../controllers/talkerController');

router.get('/', async (_req, res) => {
  const talkers = await getTalkers();
  if (!talkers) return res.status(200).json({});
  res.status(200).json(talkers);
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const talkers = await getTalkers();
  const talker = talkers.find((tal) => tal.id === Number(id));

  if (!talker) {
    return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  }
  res.status(200).json(talker);
});

router.post('/', tokenValidation, validateName, validateAge,
validateTalk, validateTalkFields, async (req, res) => {
  const { name, age, talk } = req.body;
  const talkers = await getTalkers();
  const talker = { name, age, id: (talkers.length + 1), talk };

  talkers.push(talker);
  await setTalkers(talkers);

  return res.status(201).json(talker);
});

router.put('/:id', tokenValidation, validateName, validateAge,
validateTalk, validateTalkFields, async (req, res) => {
  const { id } = req.params;
  const talkers = await getTalkers();
  const edit = { ...req.body, id: Number(id) };
  const oldTalkers = talkers.filter((talker) => talker.id !== Number(id));
  const newTalkers = [...oldTalkers, edit];
  await setTalkers(newTalkers);
  res.status(200).json(edit);
});

module.exports = router;
