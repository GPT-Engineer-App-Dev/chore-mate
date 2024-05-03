import { Box, VStack, Input, IconButton, useToast, Heading, Text, Flex, Spacer } from '@chakra-ui/react';
import { FaPlus, FaTrash } from 'react-icons/fa';
import { useState } from 'react';

const Index = () => {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState('');
  const toast = useToast();

  const addTask = () => {
    if (input === '') {
      toast({
        title: 'No task entered',
        status: 'warning',
        duration: 2000,
        isClosable: true,
      });
      return;
    }
    const newTask = {
      id: tasks.length + 1,
      text: input,
      isCompleted: false,
    };
    setTasks([...tasks, newTask]);
    setInput('');
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const toggleTaskCompletion = (id) => {
    setTasks(tasks.map(task => task.id === id ? { ...task, isCompleted: !task.isCompleted } : task));
  };

  return (
    <Box p={5}>
      <Flex mb={5}>
        <Heading size="lg">Todo App</Heading>
        <Spacer />
        <Text fontSize="xl">Tasks: {tasks.length}</Text>
      </Flex>
      <VStack spacing={4}>
        <Flex>
          <Input
            placeholder="Add a new task"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && addTask()}
          />
          <IconButton
            icon={<FaPlus />}
            onClick={addTask}
            colorScheme="blue"
            ml={2}
          />
        </Flex>
        {tasks.map(task => (
          <Flex key={task.id} w="100%" p={2} borderWidth="1px" borderRadius="lg" alignItems="center">
            <Text as={task.isCompleted ? 's' : ''} flex={1} onClick={() => toggleTaskCompletion(task.id)} cursor="pointer">
              {task.text}
            </Text>
            <IconButton
              icon={<FaTrash />}
              onClick={() => deleteTask(task.id)}
              colorScheme="red"
            />
          </Flex>
        ))}
      </VStack>
    </Box>
  );
};

export default Index;