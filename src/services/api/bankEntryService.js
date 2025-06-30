const bankEntryService = {
  async getAll() {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "Tags" } },
          { field: { Name: "Owner" } },
          { field: { Name: "CreatedOn" } },
          { field: { Name: "CreatedBy" } },
          { field: { Name: "ModifiedOn" } },
          { field: { Name: "ModifiedBy" } },
          { field: { Name: "date" } },
          { field: { Name: "description" } },
          { field: { Name: "reference" } },
          { field: { Name: "amount" } },
          { field: { Name: "balance" } },
          { field: { Name: "type" } },
          { field: { Name: "status" } }
        ]
      };

      const response = await apperClient.fetchRecords('bank_entry', params);

      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      return response.data || [];
    } catch (error) {
      console.error('Error fetching bank entries:', error);
      throw error;
    }
  },

  async getById(id) {
    if (!Number.isInteger(id) || id <= 0) {
      throw new Error('Invalid ID: must be a positive integer');
    }

    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "Tags" } },
          { field: { Name: "Owner" } },
          { field: { Name: "CreatedOn" } },
          { field: { Name: "CreatedBy" } },
          { field: { Name: "ModifiedOn" } },
          { field: { Name: "ModifiedBy" } },
          { field: { Name: "date" } },
          { field: { Name: "description" } },
          { field: { Name: "reference" } },
          { field: { Name: "amount" } },
          { field: { Name: "balance" } },
          { field: { Name: "type" } },
          { field: { Name: "status" } }
        ]
      };

      const response = await apperClient.getRecordById('bank_entry', id, params);

      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      return response.data;
    } catch (error) {
      console.error(`Error fetching bank entry with ID ${id}:`, error);
      throw error;
    }
  },

  async create(entryData) {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      // Filter to only include Updateable fields
      const updateableData = {
        Name: entryData.Name,
        Tags: entryData.Tags,
        Owner: entryData.Owner,
        date: entryData.date,
        description: entryData.description,
        reference: entryData.reference,
        amount: entryData.amount,
        balance: entryData.balance,
        type: entryData.type,
        status: entryData.status
      };

      const params = {
        records: [updateableData]
      };

      const response = await apperClient.createRecord('bank_entry', params);

      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      if (response.results) {
        const failedRecords = response.results.filter(result => !result.success);
        if (failedRecords.length > 0) {
          console.error(`Failed to create ${failedRecords.length} records:${JSON.stringify(failedRecords)}`);
          throw new Error(failedRecords[0].message || 'Failed to create bank entry');
        }
        return response.results[0].data;
      }

      return response.data;
    } catch (error) {
      console.error('Error creating bank entry:', error);
      throw error;
    }
  },

  async update(id, entryData) {
    if (!Number.isInteger(id) || id <= 0) {
      throw new Error('Invalid ID: must be a positive integer');
    }

    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      // Filter to only include Updateable fields plus Id
      const updateableData = {
        Id: id,
        Name: entryData.Name,
        Tags: entryData.Tags,
        Owner: entryData.Owner,
        date: entryData.date,
        description: entryData.description,
        reference: entryData.reference,
        amount: entryData.amount,
        balance: entryData.balance,
        type: entryData.type,
        status: entryData.status
      };

      const params = {
        records: [updateableData]
      };

      const response = await apperClient.updateRecord('bank_entry', params);

      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      if (response.results) {
        const failedRecords = response.results.filter(result => !result.success);
        if (failedRecords.length > 0) {
          console.error(`Failed to update ${failedRecords.length} records:${JSON.stringify(failedRecords)}`);
          throw new Error(failedRecords[0].message || 'Failed to update bank entry');
        }
        return response.results[0].data;
      }

      return response.data;
    } catch (error) {
      console.error('Error updating bank entry:', error);
      throw error;
    }
  },

  async delete(id) {
    if (!Number.isInteger(id) || id <= 0) {
      throw new Error('Invalid ID: must be a positive integer');
    }

    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      const params = {
        RecordIds: [id]
      };

      const response = await apperClient.deleteRecord('bank_entry', params);

      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      if (response.results) {
        const failedRecords = response.results.filter(result => !result.success);
        if (failedRecords.length > 0) {
          console.error(`Failed to delete ${failedRecords.length} records:${JSON.stringify(failedRecords)}`);
          throw new Error(failedRecords[0].message || 'Failed to delete bank entry');
        }
        return true;
      }

      return true;
    } catch (error) {
      console.error('Error deleting bank entry:', error);
      throw error;
    }
  }
};

export default bankEntryService